import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map(); // # significa que é privado
  //métodos
  create(video) {
    const videoId = randomUUID();
    this.#videos.set(videoId, video);
  }
  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const videoData = videoArray[1];

        return {
          id,
          ...videoData,
        };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }

        return true;
      });
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
