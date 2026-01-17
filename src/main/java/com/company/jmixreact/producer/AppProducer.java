package com.company.jmixreact.producer;

import com.company.jmixreact.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class AppProducer {

    private final RabbitTemplate rabbitTemplate;

    public AppProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendHelloToB() {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                "to.appB",
                "Hello from App A"
        );
    }
}