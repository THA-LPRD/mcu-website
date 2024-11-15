import { Eye } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';


export function Template() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Template Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Template Selection</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Basic Template</option>
                      <option>Social Media Card</option>
                      <option>Banner Template</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input placeholder="Enter title..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea placeholder="Enter description..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Color</label>
                    <Input type="color" className="h-10" />
                  </div>
                  <Button>
                    <Eye className="w-4 h-4 mr-2" />
                    Update Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Template Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 min-h-[400px] bg-gray-50">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Template preview will appear here
                  </div>
                </div>
                <Button className="mt-4">Download PNG</Button>
              </CardContent>
            </Card>
          </div>
    );
}
