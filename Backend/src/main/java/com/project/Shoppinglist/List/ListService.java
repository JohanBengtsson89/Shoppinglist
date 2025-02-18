package com.project.Shoppinglist.List;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListService {

    private final ListRepository listRepository;

    public ListService(ListRepository listRepository) {
        this.listRepository = listRepository;
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
