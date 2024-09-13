package com.app.twitterclon.config;
import jakarta.servlet.MultipartConfigElement;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

@Configuration
public class FileUploadConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofMegabytes(50)); // Establece el límite de tamaño del archivo a 50 MB
        factory.setMaxRequestSize(DataSize.ofMegabytes(50)); // Establece el límite de la solicitud
        return factory.createMultipartConfig();
    }
}
