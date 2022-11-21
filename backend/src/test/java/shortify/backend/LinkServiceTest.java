package shortify.backend;

import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class LinkServiceTest {

    @Test
    void getLinks() {

        //Given

        LinkRepository linkRepository = mock(LinkRepository.class);
        List<Link> links = new ArrayList<>();
        Link link = new Link("https://testlink.test/");
        links.add(link);

        //When

        when(linkRepository.findAll()).thenReturn(links);
        List<Link> actual =linkRepository.findAll();

        //Then

        assertEquals(links, actual);
    }
}
