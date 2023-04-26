package com.guillermods.jewlery.products;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@EqualsAndHashCode
public class Product {

    @Id
    private String id;

    @NotBlank(message = "name must be provided")
    private String name;

    private String category;

    @NotBlank(message = "description must be provided")
    private String description;

    @NotNull(message = "quantity must be provided")
    private Integer quantity;

    @NotBlank(message = "image name must be provided")
    private String imageName;

    private BigDecimal price;

}