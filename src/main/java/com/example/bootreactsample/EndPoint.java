package com.example.bootreactsample;

import com.google.gson.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class EndPoint {
    @RequestMapping("common/login")
    public String get() {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", "OK");
//        jsonObject.addProperty("message", "로그인 실패");

        JsonArray roleAttrs = new JsonArray();
        roleAttrs.add("ROLE_DEV");

        JsonObject roleGroup = new JsonObject();
        roleGroup.addProperty("roleGroupId", 1234);
        roleGroup.addProperty("roleGroupName", "테스트그룹");
        roleGroup.add("roleAttrs", roleAttrs);

        JsonObject auth = new JsonObject();
        auth.addProperty("memeberId", 1111);
        auth.add("roleGroup", roleGroup);

        JsonObject data = new JsonObject();
        data.addProperty("accessToken", "efg1234fnl");
        data.add("auth", auth);
        
        jsonObject.add("data", data);
        return jsonObject.toString();
    }
}
