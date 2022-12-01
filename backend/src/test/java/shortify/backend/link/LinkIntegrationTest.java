package shortify.backend.link;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import shortify.backend.model.LinkResponseDTO;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LinkIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    void getLinksAndExpectEmptyListOfLinks() throws Exception {

        mvc.perform(MockMvcRequestBuilders.get("/api/links"))
                .andExpect(status().isOk())
                .andExpect((content().json("[]")));
    }

    @Test
    void postLongLinkByIdAndExpectRedirectionUsingShortLink() throws Exception {

        String body = mvc.perform(MockMvcRequestBuilders.post("/api/links")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""" 
                                    {
                                        "link": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html"
                                    }
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        LinkResponseDTO linkResponseDTO = objectMapper.readValue(body, LinkResponseDTO.class);

        mvc.perform(MockMvcRequestBuilders.get("/" + linkResponseDTO.shortLink().split("/")[1]))
                .andExpect(status().is(302))
                .andExpect(redirectedUrl("https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html"));
    }
}
