package com.guillermods.jewlery.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

	@Bean
	public WebMvcConfigurer corsConfigurerForDev() {
		return new WebMvcConfigurer() {
			@Override
			public void addViewControllers(ViewControllerRegistry registry) {

				registry.addViewController("/{spring:\\w+}")
						.setViewName("forward:/");
				registry.addViewController("/**/{spring:\\w+}")
						.setViewName("forward:/");
						
			}
		};
	}

}
