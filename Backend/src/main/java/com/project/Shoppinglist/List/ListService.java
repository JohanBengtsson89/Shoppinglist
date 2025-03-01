package com.project.Shoppinglist.List;

import com.project.Shoppinglist.Item.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListService {

    private final ListRepository listRepository;

    private final ItemRepository itemRepository;

    @Autowired
    public ListService(ListRepository listRepository, ItemRepository itemRepository) {
        this.listRepository = listRepository;
        this.itemRepository = itemRepository;
    }

    public void deleteById(Long id) {
        listRepository.deleteById(id);
    }

    public List<ListModel> getAllLists() {
        return listRepository.findAll();
    }

    public ListModel createList(ListModel list) {
        return listRepository.save(list);
    }

    public Optional<ListModel> findById(Long id) {
        return listRepository.findById(id);
    }
}
