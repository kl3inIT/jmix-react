package com.company.jmixreact.view.producer;

import com.company.jmixreact.producer.AppProducer;
import com.company.jmixreact.view.main.MainView;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.router.Route;
import io.jmix.flowui.kit.component.button.JmixButton;
import io.jmix.flowui.view.StandardView;
import io.jmix.flowui.view.Subscribe;
import io.jmix.flowui.view.ViewController;
import io.jmix.flowui.view.ViewDescriptor;
import org.springframework.beans.factory.annotation.Autowired;

@Route(value = "Producer-view", layout = MainView.class)
@ViewController(id = "ProducerView")
@ViewDescriptor(path = "Producer-view.xml")
public class ProducerView extends StandardView {
    @Autowired
    private AppProducer appProducer;

    @Subscribe(id = "reactProducerButton", subject = "clickListener")
    public void onReactProducerButtonClick(final ClickEvent<JmixButton> event) {
        appProducer.sendHelloToB();
    }



}
