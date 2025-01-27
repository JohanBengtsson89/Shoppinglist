package com.project.Shoppinglist.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/item")
public class ItemController {


    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    @GetMapping("/")
    public String index(){
        return "Tjenare";
    }

    @GetMapping("/get")
    public List<ItemModel> getItems(){
        System.out.println("Hej fran controller");
        return itemService.getAllItems();
    }

    @PostMapping("/post")
    public ResponseEntity<ItemModel> createItem(@RequestBody ItemModel item) {
        ItemModel savedItem = itemService.createItem(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }


}
