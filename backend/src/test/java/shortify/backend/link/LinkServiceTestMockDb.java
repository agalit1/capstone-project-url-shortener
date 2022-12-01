package shortify.backend.link;

import org.junit.jupiter.api.Test;
import shortify.backend.IdGenerator;
import shortify.backend.LinkRepository;
import shortify.backend.LinkService;
import shortify.backend.model.Link;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


public class LinkServiceTestMockDb {

    private final String SITE_URL = "localhost:8080";
    private final int LINK_LENGTH = 4;

    private final LinkRepository linkRepository = mock(LinkRepository.class);
    private final IdGenerator idGenerator = mock(IdGenerator.class);
    private final LinkService linkService = new LinkService(linkRepository, idGenerator, SITE_URL, LINK_LENGTH);

    @Test
    void getLinksAndExpectEmptyListOfLinks() {

        // Given

        List<Link> links = new ArrayList<>();
        Link link = new Link("https://testlink.test", "abC3");
        links.add(link);

        // When

        when(linkRepository.findAll()).thenReturn(links);
        List<Link> actual = linkService.getLinks();

        // Then

        assertEquals(links, actual);
    }

    @Test
    void findLongLinkByIdAndExpectLongLinkWithId() {

        // Given

        String id = "abC3";
        String longLink = "https://testlink.test";
        Link link = new Link(longLink, id);
        Optional<Link> optionalLink = Optional.of(link);

        // When

        when(linkRepository.findById(id)).thenReturn(optionalLink);
        String actual = linkService.getLongLinkById(id);

        //Then

        assertEquals(longLink, actual);
    }

    @Test
    void searchForLongLinkByIdAndExpectNoLongLinkWithSuchIdFound() {

        // Given

        String id = "abC3";
        Optional<Link> optionalLink = Optional.empty();

        // When

        when(linkRepository.findById(id)).thenReturn(optionalLink);

        // Then

        assertThrows(
                NoSuchElementException.class,
                () -> linkService.getLongLinkById(id)
        );
    }
}
