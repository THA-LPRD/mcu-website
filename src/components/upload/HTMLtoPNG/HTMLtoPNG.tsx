import { Eye } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function HTMLtoPNG() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>HTML Input</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your HTML here..."
                  className="min-h-[300px]"
                />
                <Button className="mt-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Generate Preview
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Preview will appear here
                  </div>
                </div>
                <Button className="mt-4">Download PNG</Button>
              </CardContent>
            </Card>
          </div>
    );
}
