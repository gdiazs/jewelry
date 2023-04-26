package com.guillermods.jewlery.products;

import jakarta.validation.constraints.NotNull;

public record ProductQuantityDto(@NotNull Integer quantity) {}
