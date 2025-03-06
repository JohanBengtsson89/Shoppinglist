package com.project.Shoppinglist.List;


import com.project.Shoppinglist.Item.ItemModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/getByID/{id}")
    public Optional<ListModel> findById(@RequestParam Long id) {
        return listService.findById(id);
    }

    @PostMapping("/post")
    public ResponseEntity<ListModel> createList(@RequestBody ListModel list) {
        ListModel savedList = listService.createList(list);
        return new ResponseEntity<>(savedList, HttpStatus.CREATED);
    }

    @PostMapping("/additem/{listID}")
    public ResponseEntity<ListModel> addItem(@RequestBody ItemModel item, @PathVariable Long listID) {
        return listService.addItem(item, listID);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteById(@RequestParam Long id) {
        listService.deleteById(id);
        return "List successfully deleted";
    }
}
