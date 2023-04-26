package com.guillermods.jewlery.products;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/products/v1")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Collection<Product>> get() {
        return ResponseEntity.ok(this.productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<Product> post(@Valid @RequestBody Product product) {
        return ResponseEntity.ok(this.productService.addProduct(product));
    }

    @PutMapping("/remove-item/{id}")
    public ResponseEntity<Product> removeItem(@PathVariable String id) {
        return ResponseEntity.ok(this.productService.removeItem(id));
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<Product> putQuantity(@PathVariable String id,
            @Valid @RequestBody ProductQuantityDto productQuantityDto) {
        return ResponseEntity.ok(this.productService.updateQuantity(id, productQuantityDto.quantity()));
    }

}
