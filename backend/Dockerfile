 # Stage 1: Build the Go application
FROM golang:1.21-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o myapp

# Stage 2: Create the final image
FROM alpine:latest

COPY --from=build /app/myapp /myapp

CMD ["/myapp"]

