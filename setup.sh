
#!/bin/bash

# Define variables
PROJECT_FOLDER="/home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp"
DATABASE_NAME="289d79e2_f746_4299_982b_f5d6a74d2d14"

# Create Spring Boot project using Spring CLI
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Clinic Patient Queue Management System" \
  --description="A system for managing patient queues in medical clinics" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql \
  --build=maven \
  "$PROJECT_FOLDER"

# Wait for project generation to complete
sleep 2

# Create MySQL database
mysql -u root -pexamly -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed, will use default"

# Configure application.properties
cat > "${PROJECT_FOLDER}/src/main/resources/application.properties" << EOL
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
EOL

# Add Lombok dependency to pom.xml
sed -i '/<\/dependencies>/i \
        <dependency>\
            <groupId>org.projectlombok</groupId>\
            <artifactId>lombok</artifactId>\
            <optional>true</optional>\
        </dependency>' "${PROJECT_FOLDER}/pom.xml"

echo "Spring Boot project has been generated successfully in ${PROJECT_FOLDER}"
