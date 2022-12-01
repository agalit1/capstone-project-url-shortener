package shortify.backend;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

@Component
public class IdGenerator {

    public String generateId(int length) {
        return RandomStringUtils.randomAlphanumeric(length); //NOSONAR not used in secure contexts
    }
}
