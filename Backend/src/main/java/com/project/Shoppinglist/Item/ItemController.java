package com.project.Shoppinglist.Item;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private static final Logger log = LoggerFactory.getLogger(ItemController.class);


    private final ItemService itemService;


    @Autowired
    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    @GetMapping("/get")
    public List<ItemModel> getItems(){
        log.info("Fetching all items...");
        return itemService.getAllItems();
    }

    @GetMapping("getById/{id}")
    public Optional<ItemModel> getById(@RequestParam Long id) {
        return itemService.getById(id);
    }

    @PostMapping("/post")
    public ResponseEntity<ItemModel> createItem(@RequestBody ItemModel item, @AuthenticationPrincipal Jwt jwt ) {
        // Log the incoming item object for debugging
        log.info("Received item: {}", item);
        ItemModel savedItem = itemService.createItem(item);
        log.info("Item saved: {}", savedItem);  // Log the saved item
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    @DeleteMapping("delete/{id}")
    public String deleteById(@RequestParam Long id) {
        itemService.deleteById(id);
        return "Successfully deleted";
    }

    @DeleteMapping("delete/list")
    public String deleteItemsList(@RequestBody List<Long> itemIDs) {
        for (Long item : itemIDs) {
            itemService.deleteById(item);
        }
        return "Successfully deleted shopping list";
    }


}
