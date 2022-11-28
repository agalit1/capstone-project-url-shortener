package shortify.backend;

import org.junit.jupiter.api.Test;
import shortify.backend.model.Link;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class LinkServiceTest {

    private final LinkRepository linkRepository = mock(LinkRepository.class);

    @Test
    void getLinksAndExpectEmptyListOfLinks() {

        //Given

        List<Link> links = new ArrayList<>();
        Link link = new Link("https://testlink.test", "abC3");
        links.add(link);

        //When

        when(linkRepository.findAll()).thenReturn(links);
        List<Link> actual = linkRepository.findAll();

        //Then

        assertEquals(links, actual);
    }

    @Test
    void getLongLinkById() {

        //Given

        String id = "abC3";
        Link longLink = new Link("https://testlink.test", "abC3");
        Optional<Link> optionalLink = Optional.of(longLink);

        //When

        when(linkRepository.findById(id)).thenReturn(optionalLink);
        Optional<Link> actual = Optional.of(longLink);

        //Then

        assertEquals(optionalLink, actual);
    }

//    @Test
//    void
}
