package com.web.curation.controller.account;

import com.web.curation.dao.user.UserDao;
import com.web.curation.model.user.*;
import com.web.curation.service.jwt.JwtService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.web.curation.service.jwt.JwtServiceImpl.logger;
import static com.web.curation.utils.HttpUtils.convertObjToJson;
import static com.web.curation.utils.HttpUtils.makeResponse;

//@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
//      @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
//      @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
//      @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/account")
public class AccountController {

   @Autowired
   private UserDao userDao;
   @Autowired
   private JwtService jwtService;

   @PostMapping
   @ApiOperation(value = "회원가입")
   public Object signup(
         @Valid @RequestBody @ApiParam(value = "회원가입 시 필요한 회원정보(이메일, 별명, 비밀번호).", required = true) SignupRequest request) {
      // 이메일, 닉네임 중복처리 필수
      // 회원가입단을 생성해 보세요.
      String email = request.getEmail().trim();
      String nickname = request.getNickname().trim();
      String password = request.getPassword().trim();

      // User curUser = userDao.getUserByEmail(email);
      // 이메일 중복 체크
      if (userDao.findById(email).isPresent()) {
         return makeResponse("400", null, "this email already exists", HttpStatus.BAD_REQUEST);
      }
      // 이메일, 별명, 패스워드 비어있는지 확인
      if ("".equals(email) || "".equals(nickname) || "".equals(password))
         return makeResponse("400", null, "data is blank", HttpStatus.BAD_REQUEST);

      // 별명 체크
      if (userDao.getUserByNickname(nickname) != null)
         return makeResponse("400", null, "this nickname already exists", HttpStatus.BAD_REQUEST);
      User user = User.builder().email(email).password(password).nickname(nickname).build();
      User savedUser = userDao.save(user);
      return makeResponse("200", convertObjToJson(savedUser), "success", HttpStatus.OK);
   }


   @PostMapping("/login")
   @ApiOperation(value = "로그인", notes = "아이디와 비밀번호를 받아 로그인을 합니다.")
   public Object login(
         @RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) AuthenticationRequest request) {
      String email = request.getEmail().trim();
      String password = request.getPassword().trim();
      Optional<User> curUser = userDao.findUserByEmailAndPassword(email, password);
      // 로그인 했을 때 유저 정보(이메일, 닉네임) 보내주기
      if (curUser.isPresent()) {
         //토큰생성
         String token = jwtService.create("email", curUser.get().getEmail(),"Authorization");

         return makeResponse("200", token, "success", HttpStatus.OK);
      } else {
         return makeResponse("400", null, "mismatch", HttpStatus.BAD_REQUEST);
      }
   }

   @PutMapping("/password")
   @ApiOperation(value = "비밀번호 변경")
   public Object changePassword(
         @Valid @RequestBody @ApiParam(value = "비밀번호 변경 시 필요한 회원정보(이메일, 기존 비밀번호, 새 비밀번호).", required = true) ChangePasswordRequest request, HttpServletRequest http) {
      //이메일 안줬어 토큰만줬어 프론트에서
//      Enumeration<String> jwts = http.getHeaders("Authorization");
//      String jwt = http.getHeader("Authorization");
      String userEmail = request.getUserEmail();
      Optional<User> curUser = userDao.findByEmail(userEmail);

      if (!curUser.isPresent()) {
         return makeResponse("404", null, "user not found", HttpStatus.NOT_FOUND);
      }
      String password = request.getPassword().trim();
      String newPassword = request.getNewPassword().trim();
      System.out.println(request.toString());
      User updateUser = curUser.get();

      // 비밀번호랑 User의 비밀번호와 같은지 확인
      if (!password.equals(updateUser.getPassword())) {
         return makeResponse("400", null, "password is not match", HttpStatus.BAD_REQUEST);
      } else {
         updateUser.setPassword(newPassword);
         userDao.save(updateUser);
         return makeResponse("200", convertObjToJson(updateUser), "success", HttpStatus.OK);
      }
   }

   @PutMapping
   @ApiOperation(value = "회원 수정")
   public Object update(                                                                                                     //프론트에서 받아옴
         @Valid @RequestBody @ApiParam(value = "회원 정보 수정(닉네임, 한줄 소개).", required = true) UpdateRequest request,HttpServletRequest http) {

      //스프링에서 사용가능
      String myEmail= jwtService.getUserEmail();
      Optional<User> curUser = userDao.findByEmail(myEmail);
      if (!curUser.isPresent()) {
         return makeResponse("404", null, "user not found", HttpStatus.NOT_FOUND);
      }

      String nickname = request.getNickname().trim();
      String introduction = request.getIntroduction().trim();

      User updateUser = curUser.get();

      updateUser.setNickname(nickname);
      updateUser.setIntroduction(introduction);
      userDao.save(updateUser);
      return makeResponse("200", convertObjToJson(updateUser), "success", HttpStatus.OK);
   }

   @GetMapping("/{email}")
   @ApiOperation(value = "회원 조회")
   public Object getDetailInfo(@PathVariable("email") @ApiParam(value = "인증할 회원의 아이디.", required = true) String email, HttpServletRequest request) {
      // jwt에 대한 인증과정을 거치는 이유
      // 회원정보조회 이렇게 하면 안되는 이유 -> url만 바꿔주면 남의 정보를 얻게되잖아
      // 아예 email을 배제한체 그냥 토큰만 받을거야
      // 토큰 받아서 너가 디코드해서 (jwtService.getEmail)해서 쓸거야
      // String token = request.getHeader("access-token");
      HttpStatus status = HttpStatus.ACCEPTED;
      Optional<User> curUser = null;
      if (jwtService.isUsable(request.getHeader("access-token"))) {
         logger.info("사용 가능한 토큰!!!");
         try {
            // 로그인 사용자 정보.
            curUser = userDao.findById(email);
            status = HttpStatus.ACCEPTED;
         } catch (Exception e) {
            logger.error("정보조회 실패 : {}", e);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
         }
      } else {
         logger.error("사용 불가능 토큰!!!");
         status = HttpStatus.ACCEPTED;
      }

      return makeResponse("200", convertObjToJson(curUser.get()), "success", HttpStatus.OK);
   }

   @DeleteMapping
   @ApiOperation(value = "회원 삭제")
   public Object delete(
         @Valid @RequestBody @ApiParam(value = "회원정보 탈퇴 시 필요한 회원정보(이메일, 별명, 비밀번호).", required = true) SignupRequest request) {
      Optional<User> curUser = userDao.findById(request.getEmail());
      if (!curUser.isPresent()) {
         return makeResponse("404", null, "user not found", HttpStatus.NOT_FOUND);
      }

      userDao.delete(curUser.get());

      return makeResponse("200", curUser.get().getEmail(), "success", HttpStatus.OK);
   }
}