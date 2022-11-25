package shortify.backend;

import lombok.Data;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

@Data
@Service
public class IdGenerator {

    public String generateId() {
        return RandomStringUtils.randomAlphanumeric(4);
    }
}