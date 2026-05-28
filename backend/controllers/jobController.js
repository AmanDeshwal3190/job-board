const Job = require('../models/Job');

// Get all jobs
const getJobs = async (req, res) => {
    try {
        const keyword = req.query.search
            ? { title: { $regex: req.query.search, $options: 'i' } }
            : {};
        const type = req.query.type ? { type: req.query.type } : {};
        const jobs = await Job.find({ ...keyword, ...type })
            .populate('postedBy', 'name email')
            .sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single job
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create job
const createJob = async (req, res) => {
    try {
        const job = new Job({ ...req.body, postedBy: req.user._id });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update job
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete job
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob };