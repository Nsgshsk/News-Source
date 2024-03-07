FROM python:bookworm

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip install -r /requirements.txt

# Set work directory.
RUN mkdir /home/app
WORKDIR /home/app

# Copy project code.
COPY . /home/app

EXPOSE 8000