package com.company.jmixreact.config;

import com.company.jmixreact.entity.User;
import io.jmix.core.UnconstrainedDataManager;
import io.jmix.core.querycondition.PropertyCondition;
import io.jmix.core.security.UserRepository;
import io.jmix.oidc.claimsmapper.ClaimsRolesMapper;
import io.jmix.oidc.usermapper.SynchronizingOidcUserMapper;
import io.jmix.rest.security.role.RestMinimalRole;
import io.jmix.security.role.RoleGrantedAuthorityUtils;
import io.jmix.security.role.assignment.RoleAssignmentRoleType;
import io.jmix.securitydata.entity.RoleAssignmentEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class AppSynchronizingOidcUserMapper extends SynchronizingOidcUserMapper<User> {
    public AppSynchronizingOidcUserMapper(UnconstrainedDataManager dataManager,
                                          UserRepository userRepository,
                                          ClaimsRolesMapper claimsRolesMapper,
                                          RoleGrantedAuthorityUtils roleGrantedAuthorityUtils) {
        super(dataManager, userRepository, claimsRolesMapper, roleGrantedAuthorityUtils);

        //store role assignments in the database (false by default)
        setSynchronizeRoleAssignments(false);
    }

    @Override
    protected Class<User> getApplicationUserClass() {
        return User.class;
    }
    @Override
    protected String getOidcUserUsername(OidcUser oidcUser) {
        return oidcUser.getPreferredUsername();
    }

    @Override
    protected void populateUserAttributes(OidcUser oidcUser, User jmixUser) {
        jmixUser.setUsername(oidcUser.getPreferredUsername());
    }

    @Override
    protected void populateUserAuthorities(OidcUser oidcUser, User jmixUser) {
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        List<RoleAssignmentEntity> existedRoles = dataManager.load(RoleAssignmentEntity.class)
                .condition(PropertyCondition.equal("username", oidcUser.getPreferredUsername()))
                .list();

        if (!existedRoles.isEmpty()) {
            for (RoleAssignmentEntity role : existedRoles) {
                GrantedAuthority grantedAuthority = null;
                if (role.getRoleType().equals(RoleAssignmentRoleType.RESOURCE)) {
                    grantedAuthority = roleGrantedAuthorityUtils.createResourceRoleGrantedAuthority(role.getRoleCode());
                }else  if ( role.getRoleType().equals(RoleAssignmentRoleType.ROW_LEVEL)){
                    grantedAuthority = roleGrantedAuthorityUtils.createRowLevelRoleGrantedAuthority(role.getRoleCode());
                }
                if (grantedAuthority != null) {
                    grantedAuthorities.add(grantedAuthority);
                }
            }
        }

        if (!grantedAuthorities.isEmpty()) {
            grantedAuthorities.add(roleGrantedAuthorityUtils.createResourceRoleGrantedAuthority(RestMinimalRole.CODE));
            jmixUser.setAuthorities(grantedAuthorities);
        }
//        if (grantedAuthorities.size() == 0) {
//            // set minimum bacsic roles
//            grantedAuthorities.add(roleGrantedAuthorityUtils.createResourceRoleGrantedAuthority(FullAccessRole.CODE));
//            grantedAuthorities.add(roleGrantedAuthorityUtils.createResourceRoleGrantedAuthority(UiMinimalRole.CODE));
//            grantedAuthorities.add(roleGrantedAuthorityUtils.createResourceRoleGrantedAuthority(RestMinimalRole.CODE));
//            jmixUser.setAuthorities(grantedAuthorities);
//        }
    }

}

