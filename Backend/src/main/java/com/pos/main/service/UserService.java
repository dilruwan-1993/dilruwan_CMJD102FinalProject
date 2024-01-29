package com.pos.main.service;

import com.pos.main.dto.UserDTO;
import com.pos.main.entity.User;
import com.pos.main.util.ResponseDTO;

public interface UserService {

    public ResponseDTO<UserDTO> login(UserDTO dto)throws Exception;
    public UserDTO convertToDTO(User u);

}
