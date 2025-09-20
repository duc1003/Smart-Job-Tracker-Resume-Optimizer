
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, 
  Calendar as CalendarIcon,
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Link,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const JobApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    jobUrl: "",
    description: "",
    status: "pending",
    priority: "medium",
    applicationDate: new Date(),
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application data:", { ...formData, skills });
    toast({
      title: "Application Added",
      description: `Application for ${formData.position} at ${formData.company} has been saved.`,
    });
    // Reset form
    setFormData({
      company: "",
      position: "",
      location: "",
      salary: "",
      jobUrl: "",
      description: "",
      status: "pending",
      priority: "medium",
      applicationDate: new Date(),
    });
    setSkills([]);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plus className="w-6 h-6" />
          Add New Job Application
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building className="w-4 h-4" />
                Company Name *
              </label>
              <Input
                placeholder="e.g., Google, Microsoft"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Position *
              </label>
              <Input
                placeholder="e.g., Senior Frontend Developer"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <Input
                placeholder="e.g., San Francisco, CA or Remote"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Salary Range
              </label>
              <Input
                placeholder="e.g., $80k - $120k"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
              />
            </div>
          </div>

          {/* Job URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Link className="w-4 h-4" />
              Job Posting URL
            </label>
            <Input
              type="url"
              placeholder="https://..."
              value={formData.jobUrl}
              onChange={(e) => setFormData({...formData, jobUrl: e.target.value})}
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Application Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.applicationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.applicationDate ? (
                      format(formData.applicationDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.applicationDate}
                    onSelect={(date) => date && setFormData({...formData, applicationDate: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Skills/Technologies */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Required Skills/Technologies
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g., React, Python)"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button type="button" onClick={addSkill} variant="outline">
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Description</label>
            <Textarea
              placeholder="Paste the job description here..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="gradient-primary text-white border-0 flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobApplicationForm;
