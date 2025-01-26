package com.project.Shoppinglist.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ItemController {


    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

/*    @GetMapping("/getItems")
    private List<Long> getItems(){
        return itemService.getAllItems;
    }*/


}
