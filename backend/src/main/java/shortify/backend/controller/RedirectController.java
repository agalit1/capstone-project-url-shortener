package shortify.backend.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import shortify.backend.service.LinkService;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/")
public class RedirectController {

    private final LinkService linkService;

    public RedirectController(LinkService linkService) {
        this.linkService = linkService;
    }

    @GetMapping("/{id}")
    public ModelAndView redirectView(@PathVariable String id, ModelMap model) {
        String redirectUrl;
        try {
            redirectUrl = linkService.getLongLinkById(id);
        } catch (NoSuchElementException e) {
            redirectUrl = "";
        }
        return new ModelAndView("redirect:" + redirectUrl, model);
    }
}
