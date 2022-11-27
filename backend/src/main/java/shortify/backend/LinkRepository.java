package shortify.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import shortify.backend.model.Link;

@Repository
public interface LinkRepository extends MongoRepository<Link, String>{
}
