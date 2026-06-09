import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;
  private bucket = 'conversions';
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }

  async upload(fileBuffer: Buffer, format: string): Promise<string> {
    const filename = `${uuidv4()}.${format}`;

    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .upload(filename, fileBuffer, {
        contentType: this.getContentType(format),
        upsert: false,
      });

    if (error) {
      throw new InternalServerErrorException(
        `Failed to upload file: ${error.message}`,
      );
    }

    const { data: urlData } = this.supabase.storage
      .from(this.bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  }

  async delete(fileUrl: string): Promise<void> {
    const filename = fileUrl.split('/').pop();

    const { error } = await this.supabase.storage
      .from(this.bucket)
      .remove([filename]);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to delete file: ${error.message}`,
      );
    }
  }

  private getContentType(format: string): string {
    const types = {
      jpg: 'image/jpeg',
      png: 'image/png',
      jpeg: 'image/jpeg',
      pdf: 'application/pdf',
      webp: 'image/webp',
    };
    return types[format] ?? 'application/octet-stream';
  }
}
