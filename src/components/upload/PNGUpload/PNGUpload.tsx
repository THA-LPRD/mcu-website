import { Upload } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function PNGUpload() {
    return (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload PNG Image</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
    );
}