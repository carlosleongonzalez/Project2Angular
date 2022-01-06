# create a dockerfile to create an image
# once the dockerfile is created, build it to create the image 
# once the image is created, run the image to create the container

# use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents
# /usr/share/nginx/html is a folder of nginx server running inside the container
COPY dist/ProjectOne /usr/share/nginx/html

# Expose port 80
EXPOSE 80 