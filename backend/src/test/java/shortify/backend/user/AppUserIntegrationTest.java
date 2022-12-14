package shortify.backend.user;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AppUserIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @DirtiesContext
    @Test
    void createAppUserAndExpectCreatedUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""" 
                                    {
                                       "username": "test",
                                       "email": "test@test.com",
                                       "password": "abcD1234!",
                                       "confirmPassword": "abcD1234!"
                                    }
                                """))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void createAppUserAndExpectIsBadRequestResponse() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""" 
                                    {
                                       "username": "test",
                                       "email": "testtest.com",
                                       "password": "abcD1234!",
                                       "confirmPassword": "abcD1234!"
                                    }
                                """))
                .andExpect(status().isBadRequest());
    }
}
