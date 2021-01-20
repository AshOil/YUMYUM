package com.web.curation.model.user;


import lombok.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRequest {
    
    String email;
    String password;
    
}
