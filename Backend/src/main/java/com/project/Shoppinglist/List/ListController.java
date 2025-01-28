package com.project.Shoppinglist.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/list")
public class ListController {

    private final ListService listService;

    @Autowired
    public ListController(ListService listService) {
        this.listService = listService;
    }

    @GetMapping("/all")
    public List<ListModel> getAllLists() {
        return listService.getAllLists();
    }

    @PostMapping("/post")
    public ResponseEntity<ListModel> createList(@RequestBody ListModel list) {
        ListModel savedList = listService.createList(list);
        return new ResponseEntity<>(savedList, HttpStatus.CREATED);
    }
}
