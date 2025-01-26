package com.project.Shoppinglist.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    /*public List<Integer> getAllItems;*/

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }


    public List<ItemModel> getAllItems() {
        return itemRepository.findAll();
    }
}
