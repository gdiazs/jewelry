package com.guillermods.jewlery.products;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class ProductService {

    @Autowired
    private EntityManager em;

    public List<Product> getAllProducts() {
        var query = this.em.createQuery("select p from Product p", Product.class);
        return query.getResultList();

    }

    public Product addProduct(@Valid Product product) {
        var uuid = UUID.randomUUID().toString();

        product.setId(uuid);
        this.em.persist(product);

        return this.em.find(Product.class, uuid);
    }

    public Product removeItem(String id) {
        var foundProduct = this.em.find(Product.class, id);
        var newQuantity = foundProduct.getQuantity() - 1;

        if (foundProduct.getQuantity() == 0) {
            return foundProduct;
        }

        foundProduct.setQuantity(newQuantity);
        return this.em.merge(foundProduct);
    }

    public Product updateQuantity(String id, Integer quantity) {

        var foundProduct = this.em.find(Product.class, id);
        foundProduct.setQuantity(quantity);
        return this.em.merge(foundProduct);

    }

}
