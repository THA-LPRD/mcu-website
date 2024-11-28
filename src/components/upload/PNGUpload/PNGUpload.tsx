import { Upload } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UploadResponse {
  success: boolean;
  message: string;
}

export function PNGUpload() {

    

    const precheckImage = async () => {
      const fileInput = document.getElementById('png-upload') as HTMLInputElement | null;

      // Überprüfen, ob das Element existiert
      if (!fileInput) {
          alert('Dateiupload nicht möglich. Bitte laden Sie die Seite neu.');
          return;
      }
  
      // Überprüfen, ob eine Datei ausgewählt wurde
      if (fileInput.files?.length === 0) {
          alert('Bitte wählen Sie eine PNG-Datei aus.');
          return;
      }
  
      const file = fileInput.files?.[0];
      
      // Überprüfen, ob eine Datei existiert und vom Typ PNG ist
      if (file && file.type === 'image/png') {
          uploadImage(file, file.name, '/api/v2/UploadImg')
              .then((result: UploadResponse) => {
                  alert(result.message);
              })
              .catch((error: Error) => {
                  console.error('Error handling file upload:', error);
              });
      } else {
          alert('Bitte wählen Sie eine gültige PNG-Datei aus.');
      }
    };

    const uploadImage = async (file: File, fileName: string, uploadUrl: string): Promise<UploadResponse> => {
        try {
            const formData = new FormData();
            formData.append('file', file, fileName);
    
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                const responseText = await response.text();
                return { success: true, message: 'Datei erfolgreich hochgeladen: ' + responseText };
            } else {
                return { success: false, message: 'Fehler beim Hochladen der Datei. Statuscode: ' + response.status };
            }
        } catch (error) {
            console.error('Fehler beim Hochladen der Datei:', error);
            if (error instanceof Error) {
              return { success: false, message: 'Fehler beim Hochladen der Datei: ' + error.message };
          } else {
              return { success: false, message: 'Fehler beim Hochladen der Datei' };
          }
        }
    }

    return (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload PNG Image</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Input 
                  type="file" 
                  accept=".png"
                  className="hidden" 
                  id="png-upload"
                />
                <label 
                  htmlFor="png-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-gray-600">Drop your PNG here or click to upload</span>
                </label>
              </div>
              <Button onClick={precheckImage}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
            </CardContent>
          </Card>
        </div>
    );
}