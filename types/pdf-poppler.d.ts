declare module 'pdf-poppler' {
  interface ConvertOptions {
    format?: 'jpeg' | 'png' | 'tiff' | 'ps' | 'eps' | 'pdf' | 'svg';
    out_dir?: string;
    out_prefix?: string;
    page?: number | null;
    single_file?: boolean;
    print_command?: string;
  }

  function convert(file: string, options: ConvertOptions): Promise<string[]>;
  
  export { convert, ConvertOptions };
  export default { convert };
}