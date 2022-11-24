package shortify.backend;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LinkService {

    public final LinkRepository linkRepository;

    public LinkService(LinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

    public List<Link> getLinks() {
        return linkRepository.findAll();
    }

    public Link insertLink(NewLink newLink) {
        Link link = new Link(newLink.link(), new IdGenerator().generateId());
        return linkRepository.save(link);
    }
}
