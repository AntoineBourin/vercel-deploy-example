import Image from "next/image";
import styles from "./page.module.css";
import { kv } from "@vercel/kv";
import UploadForm from "./upload";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export default async function Home() {
  const views = await kv.incr("views");
  const response = await list();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Nombre de vues : {views}</p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div>
        <UploadForm />
        {response.blobs.map((blob) => (
          <a key={blob.pathname} href={blob.downloadUrl}>
            <img src={blob.downloadUrl} alt="uploaded image" />
          </a>
        ))}
      </div>
    </main>
  );
}
