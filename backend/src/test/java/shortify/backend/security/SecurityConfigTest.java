package shortify.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser("custom@mail.com")
    void createAppUserDetailsExpectStatus_Ok() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
