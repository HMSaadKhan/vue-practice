  // fileUtils.ts
  import * as fs from 'fs';
  import * as path from 'path';
  
  export async function deleteImage(imageName: string): Promise<void> {
    try {
        const rootDir = process.cwd();
      const filePath = path.join(rootDir, 'uploads', imageName);
      console.log(filePath, 'fileeee pathhhhhhhhhhhhhhhhhhhh')
      console.log(__dirname, imageName, 'imageNameeeeeeeeeeeeeeeeeeeeeeeee')
      await fs.promises.unlink(filePath);
      console.log(`Image '${imageName}' deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting image '${imageName}':`, error.message);
      throw error;
    }
  }