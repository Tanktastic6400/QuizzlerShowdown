FROM tomcat:9-jdk11
# Copy your WAR file to Tomcat webapps directory
COPY build/libs/QuizzlerShowdown.war /usr/local/tomcat/webapps/
EXPOSE 8080
CMD ["catalina.sh", "run"]
