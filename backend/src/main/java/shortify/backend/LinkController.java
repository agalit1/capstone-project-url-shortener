package shortify.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/links")
public class LinkController {
    private final LinkService linkService;
    public LinkController(LinkService linkService) {
        this.linkService = linkService;
    }
    @GetMapping
    public List<Link> getLinks() {
        return linkService.getLinks();
    }
}
