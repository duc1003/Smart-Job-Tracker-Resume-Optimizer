
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Edit, Eye, Plus, Star } from "lucide-react";

const CVManager = () => {
  const cvTemplates = [
    {
      id: 1,
      name: "Master CV",
      description: "Complete comprehensive CV",
      lastModified: "2024-01-15",
      isDefault: true,
      matchScore: null,
      tags: ["Complete", "Master"]
    },
    {
      id: 2,
      name: "Frontend Developer CV",
      description: "Specialized for frontend positions",
      lastModified: "2024-01-12",
      isDefault: false,
      matchScore: 92,
      tags: ["Frontend", "React", "JavaScript"]
    },
    {
      id: 3,
      name: "Full Stack CV",
      description: "For full stack developer roles",
      lastModified: "2024-01-10",
      isDefault: false,
      matchScore: 88,
      tags: ["Full Stack", "Node.js", "MongoDB"]
    },
    {
      id: 4,
      name: "Senior Developer CV",
      description: "Emphasizing leadership experience",
      lastModified: "2024-01-08",
      isDefault: false,
      matchScore: 85,
      tags: ["Senior", "Leadership", "Architecture"]
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CV Manager
            </h1>
            <p className="text-muted-foreground mt-2">
              Create and manage different versions of your CV
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload CV
            </Button>
            <Button className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cvTemplates.map((cv) => (
            <Card key={cv.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {cv.name}
                      {cv.isDefault && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {cv.description}
                    </CardDescription>
                  </div>
                  {cv.matchScore && (
                    <Badge variant="secondary" className="gradient-success text-white">
                      {cv.matchScore}% Match
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {cv.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Last modified: {cv.lastModified}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CVManager;
