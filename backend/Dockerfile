ARG RUST_IMAGE_TAG=1.78.0-bookworm
ARG DEBIAN_IMAGE_TAG=bookworm-20240513-slim

FROM rust:${RUST_IMAGE_TAG} AS builder
WORKDIR /app

COPY ./ ./
RUN cargo build --bins --release --locked

FROM debian:${DEBIAN_IMAGE_TAG} as runner

COPY --from=builder /app/target/release/portfolio-website-backend ./app

EXPOSE 8080

CMD ["./app"]
