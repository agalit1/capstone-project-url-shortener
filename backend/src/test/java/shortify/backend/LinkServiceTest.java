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
    private final LinkService linkService = new LinkService(linkRepository);

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
    void findLongLinkByIdAndExpectLongLinkWithId() {

        //Given

        String id = "abC3";
        String longLink = "https://testlink.test";
        Link link = new Link(longLink, id);
        Optional<Link> optionalLink = Optional.of(link);

        //When

        when(linkRepository.findById(id)).thenReturn(optionalLink);
        String actual = linkService.getLongLinkById(id);

        //Then

        assertEquals(longLink, actual);
    }

//    @Test
//    void
}
