package lk.mycode.shop.service.impl;

import lk.mycode.shop.dto.ShopDTO;
import lk.mycode.shop.entity.Shop;
import lk.mycode.shop.repository.ShopRepository;
import lk.mycode.shop.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional (propagation = Propagation.SUPPORTS,readOnly = true)
public class ShopServiceImpl implements ShopService{

    @Autowired
    private ShopRepository shopRepository;

    @Override
    public void saveShop(ShopDTO dto) {
        shopRepository.save(new Shop(dto.getAddress(),dto.getMobileNo(),dto.getName()));
    }

    public List<ShopDTO> getAllShops(){
        List<Shop>shopList=shopRepository.findAll();
        List<ShopDTO>shopDTOList=new ArrayList<>();
        for (Shop shop:shopList){
            ShopDTO shopDTO=new ShopDTO(shop.getId(),shop.getAddress(),shop.getMobileNo(), shop.getName());
            shopDTOList.add(shopDTO);
        }
        return shopDTOList;
    }

    @Override
    public void updateShop(int id, ShopDTO dto) {
        if(dto.getId()!=id){
            throw new RuntimeException("Shop id is not matched");
        }else if(shopRepository.existsById(id)){
            shopRepository.save(new Shop(dto.getId(), dto.getAddress(),dto.getMobileNo(),dto.getName()));
        }else{
            throw new RuntimeException("Shop doesn't exist");
        }
    }

    @Override
    public void deleteShop(int id) {
        shopRepository.deleteById(id);
    }

    @Override
    public ShopDTO findShop(int id) {
        Shop shop=shopRepository.findById(id).get();
        return new ShopDTO(shop.getId(), shop.getAddress(), shop.getMobileNo(), shop.getName());
    }
}
