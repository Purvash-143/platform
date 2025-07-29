variable "aws_region" {
  description = "AWS region to launch the instance"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
  default     = "ami-08a6efd148b1f7504"  # Amazon Linux 2 AMI (for example)
}

variable "instance_type" {
  description = "Type of EC2 instance"
  type        = string
  default     = "t2.micro"
}

variable "instance_name" {
  description = "GOLDENPATH"
  type        = string
  default     = "GoldenPath-EC2"
}
